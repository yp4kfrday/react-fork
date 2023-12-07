import React, { memo, useMemo } from 'react';
import './style.css';

const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => i + start);

const usePaginationRange = ({ pagesCount, currentPage, dots }) => {
    const paginationRange = useMemo(() => {
        const leftIndex = Math.max(currentPage - 1, 1);
        const lastPageIndex = pagesCount;

        const rightIndex = () => {
            if (currentPage < lastPageIndex) {
                return Math.min(currentPage + 1, 3);
            } else if (currentPage === lastPageIndex) {
                return Math.min(currentPage, 2);
            }
        };

        const shouldShowLeftDots = leftIndex > 2;
        const shouldShowRightDots = rightIndex() <= pagesCount - 2;

        const firstPageIndex = 1;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 4;
            const leftRange = range(1, leftItemCount);
            return [...leftRange, dots, pagesCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3;
            const rightRange = range(pagesCount - rightItemCount + 1, pagesCount);
            return [firstPageIndex, dots, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftIndex, rightIndex());
            return [firstPageIndex, dots, ...middleRange, dots, lastPageIndex];
        }
    }, [pagesCount, currentPage, dots]);

    return paginationRange;
};

function PaginationItem({ page, currentPage, onPageChange }) {
    return (
        <>
            {page ? (
                <button onClick={() => onPageChange(page)} className={`list__item${currentPage === page ? ' list__item_active' : ''}`}>
                    <span>{page}</span>
                </button>
            ) : (
                <div>
                    <span className='dots'>...</span>
                </div>
            )}
        </>
    );
}

function Pagination({ totalPages, currentPage, onPageChange, limit }) {
    const pagesCount = Math.ceil(totalPages / limit);

    const paginationRange = usePaginationRange({ pagesCount, currentPage, dots: '...' });

    return (
        <div className='list'>
            {paginationRange?.length &&
                paginationRange.map((page, index) => (
                    <PaginationItem key={index} page={page} currentPage={currentPage} onPageChange={onPageChange} />
                ))}
        </div>
    );
}

export default memo(Pagination);
