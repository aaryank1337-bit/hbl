import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Heart,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { birthdayContent } from '../content/birthdayLetter';

// Ensure PDF.js worker is resolved correctly
// Works both in development and production with subpath hosting (GitHub Pages)
try {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  pdfjsLib.GlobalWorkerOptions.workerSrc = `${cleanBase}assets/pdf.worker.min.js`;
} catch (e) {
  console.warn('PDF.js worker initialization notice:', e);
}

interface PhotobookSectionProps {
  onProceed: () => void;
  onBackToIntro?: () => void;
}

export const PhotobookSection: React.FC<PhotobookSectionProps> = ({
  onProceed,
  onBackToIntro,
}) => {
  const { photobook } = birthdayContent;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bookContainerRef = useRef<HTMLDivElement | null>(null);
  const renderTaskRef = useRef<any>(null);

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(photobook.totalPages || 21);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPageRendering, setIsPageRendering] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [pageTurnAnimation, setPageTurnAnimation] = useState<string>('');

  // Touch gesture tracking for mobile swipe
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Determine correct PDF URL based on base path
  const getPdfUrl = useCallback(() => {
    const base = import.meta.env.BASE_URL || './';
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    return `${cleanBase}${photobook.pdfPath.replace(/^\//, '')}`;
  }, [photobook.pdfPath]);

  // Load PDF Document
  const loadPdf = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const pdfUrl = getPdfUrl();
      const loadingTask = pdfjsLib.getDocument({
        url: pdfUrl,
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
        cMapPacked: true,
      });

      const doc = await loadingTask.promise;
      setPdfDoc(doc);
      // Privacy safeguard: Ensure we cap total pages to sanitized count (21)
      const sanitizedTotal = Math.min(doc.numPages, photobook.totalPages);
      setTotalPages(sanitizedTotal);
      setIsLoading(false);
    } catch (err: any) {
      console.error('Failed to load PDF photobook:', err);
      setErrorMessage(
        'Unable to load the photobook right now. Please tap retry to load your memories.'
      );
      setIsLoading(false);
    }
  }, [getPdfUrl, photobook.totalPages]);

  useEffect(() => {
    loadPdf();
  }, [loadPdf]);

  // Render specific page on canvas with high-DPI crispness
  const renderPage = useCallback(
    async (pageNum: number) => {
      if (!pdfDoc || !canvasRef.current) return;

      // Cancel previous render task if still active to avoid conflicts
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // Ignore cancellation errors
        }
        renderTaskRef.current = null;
      }

      setIsPageRendering(true);

      try {
        const page = await pdfDoc.getPage(pageNum);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        // Container client width for responsive scaling
        const container = bookContainerRef.current;
        const containerWidth = container ? container.clientWidth : 500;

        // High-DPI support: render at devicePixelRatio (up to 3x) for ultra-sharp photos
        const dpr = Math.min(window.devicePixelRatio || 1, 3);
        const unscaledViewport = page.getViewport({ scale: 1.0 });

        // Calculate scale to fit container width perfectly while maintaining 1:1 aspect ratio
        const scaleFactor = (containerWidth / unscaledViewport.width) * dpr;
        const viewport = page.getViewport({ scale: Math.max(scaleFactor, 1.6) });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
        setIsPageRendering(false);
      } catch (err: any) {
        if (err?.name === 'RenderingCancelledException') {
          // Expected when rapidly turning pages
          return;
        }
        console.error(`Error rendering page ${pageNum}:`, err);
        setIsPageRendering(false);
      }
    },
    [pdfDoc]
  );

  // Trigger page render on page change or when document loads
  useEffect(() => {
    if (pdfDoc) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage, renderPage]);

  // Re-render on window resize to ensure crispness
  useEffect(() => {
    const handleResize = () => {
      if (pdfDoc) {
        renderPage(currentPage);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pdfDoc, currentPage, renderPage]);

  // Page Navigation Handlers
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setPageTurnAnimation('turning-next');
      setCurrentPage((prev) => prev + 1);
      setTimeout(() => setPageTurnAnimation(''), 350);
    }
  }, [currentPage, totalPages]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      setPageTurnAnimation('turning-prev');
      setCurrentPage((prev) => prev - 1);
      setTimeout(() => setPageTurnAnimation(''), 350);
    }
  }, [currentPage]);

  const jumpToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        setPageTurnAnimation(page > currentPage ? 'turning-next' : 'turning-prev');
        setCurrentPage(page);
        setTimeout(() => setPageTurnAnimation(''), 350);
      }
    },
    [currentPage, totalPages]
  );

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPrevPage]);

  // Touch Gesture Handling for Mobile Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;
    const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;

    // Only register horizontal swipe if horizontal movement exceeds vertical
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX > 0) {
        // Swiped left -> next page
        goToNextPage();
      } else {
        // Swiped right -> prev page
        goToPrevPage();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    const container = bookContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <section className="screen-wrapper" aria-label="Digital Photobook">
      {/* Top Header / Counter Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '580px',
          marginBottom: '1rem',
          padding: '0 0.5rem',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Heart size={16} fill="var(--accent-primary)" color="var(--accent-primary)" />
          <span
            className="font-serif"
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'var(--accent-deep)',
              letterSpacing: '0.04em',
            }}
          >
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* Action Controls (Fullscreen & Back) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            className="nav-btn"
            style={{ width: '38px', height: '38px' }}
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit full screen' : 'View full screen'}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Main Photobook Viewer Container */}
      <div
        ref={bookContainerRef}
        className={`photobook-container ${isFullscreen ? 'fullscreen-mode' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* The Realistic Book Page Frame */}
        <div className={`photobook-frame ${pageTurnAnimation}`}>
          {/* Loading Skeleton */}
          {isLoading && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem',
                color: 'var(--accent-deep)',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '3px solid var(--accent-soft)',
                  borderTopColor: 'var(--accent-primary)',
                  animation: 'spin 1s linear infinite',
                }}
              />
              <p className="font-serif" style={{ fontStyle: 'italic', fontSize: '1.1rem' }}>
                Opening Saniya's photobook...
              </p>
            </div>
          )}

          {/* Error State */}
          {errorMessage && (
            <div
              style={{
                padding: '2rem',
                textAlign: 'center',
                color: 'var(--accent-deep)',
                maxWidth: '400px',
              }}
            >
              <p style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>{errorMessage}</p>
              <button
                type="button"
                className="btn-secondary"
                onClick={loadPdf}
                style={{ gap: '0.4rem' }}
              >
                <RotateCcw size={16} />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* Canvas Rendering PDF Page */}
          <canvas
            ref={canvasRef}
            className="photobook-canvas"
            style={{
              display: isLoading || errorMessage ? 'none' : 'block',
              opacity: isPageRendering ? 0.85 : 1,
              transition: 'opacity 0.2s ease',
            }}
          />

          {/* Left / Right Tap Zones for seamless touch navigation */}
          <div
            className="touch-zone left"
            onClick={goToPrevPage}
            aria-label="Previous page"
            role="button"
            tabIndex={-1}
          />
          <div
            className="touch-zone right"
            onClick={goToNextPage}
            aria-label="Next page"
            role="button"
            tabIndex={-1}
          />
        </div>

        {/* Navigation Buttons Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '1.25rem',
            padding: '0 0.5rem',
          }}
        >
          {/* Previous Page Button */}
          <button
            type="button"
            className="nav-btn"
            onClick={goToPrevPage}
            disabled={currentPage <= 1 || isLoading}
            aria-label="Previous page"
            title="Previous page (Left arrow)"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Page Progress Dots / Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              maxWidth: '60%',
              overflowX: 'auto',
              padding: '4px 6px',
            }}
          >
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => jumpToPage(pageNum)}
                  aria-label={`Go to page ${pageNum}`}
                  style={{
                    width: isActive ? '18px' : '7px',
                    height: '7px',
                    borderRadius: '4px',
                    backgroundColor: isActive
                      ? 'var(--accent-primary)'
                      : 'var(--border-delicate)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    flexShrink: 0,
                  }}
                />
              );
            })}
          </div>

          {/* Next Page Button */}
          <button
            type="button"
            className="nav-btn"
            onClick={goToNextPage}
            disabled={currentPage >= totalPages || isLoading}
            aria-label="Next page"
            title="Next page (Right arrow)"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Heartfelt Caption below book */}
        <p
          className="font-serif"
          style={{
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2.8vw, 1.2rem)',
            color: 'var(--accent-deep)',
            textAlign: 'center',
            marginTop: '1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          {photobook.caption}
        </p>

        {/* Continue Button to Birthday Letter */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {onBackToIntro && (
            <button
              type="button"
              className="btn-secondary"
              onClick={onBackToIntro}
              aria-label="Go back to introduction"
            >
              Back
            </button>
          )}

          <button
            type="button"
            className="btn-primary"
            onClick={onProceed}
            aria-label="Continue to birthday letter"
          >
            <span>{photobook.continueButtonText}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .touch-zone {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 25%;
          z-index: 10;
          cursor: pointer;
        }

        .touch-zone.left {
          left: 0;
        }

        .touch-zone.right {
          right: 0;
        }

        .turning-next {
          animation: turnNext 0.35s cubic-bezier(0.2, 0, 0.2, 1);
        }

        .turning-prev {
          animation: turnPrev 0.35s cubic-bezier(0.2, 0, 0.2, 1);
        }

        @keyframes turnNext {
          0% {
            transform: translateX(0) scale(1);
          }
          40% {
            transform: translateX(-8px) scale(0.985);
          }
          100% {
            transform: translateX(0) scale(1);
          }
        }

        @keyframes turnPrev {
          0% {
            transform: translateX(0) scale(1);
          }
          40% {
            transform: translateX(8px) scale(0.985);
          }
          100% {
            transform: translateX(0) scale(1);
          }
        }

        /* Fullscreen styles */
        .photobook-container.fullscreen-mode {
          background-color: var(--bg-primary);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 100vw;
          max-height: 100vh;
        }

        .photobook-container.fullscreen-mode .photobook-frame {
          max-width: 82vh;
          max-height: 82vh;
        }
      `}</style>
    </section>
  );
};
