import * as React from 'react';

export interface IPagination {
	goToPage: (num: number) => void;
	count: number | undefined;
	page: number;
}

export function Pagination({ goToPage, count, page }: IPagination) {
	// pagination
	const itemsPerPage = 15;
	const pagesPerGroup = 10;
	const totalPages = count ? Math.ceil(count / itemsPerPage) : 0;
	const currentPageGroup = Math.floor((page - 1) / pagesPerGroup);
	const firstPageInGroup = currentPageGroup * pagesPerGroup + 1;
	const lastPageInGroup = Math.min(
		firstPageInGroup + pagesPerGroup - 1,
		totalPages
	);

	return (
		<div className="flex flex-row items-center mx-2">
			{count &&
				Array.from(
					{ length: lastPageInGroup - firstPageInGroup + 1 },
					(_, i) => firstPageInGroup + i
				).map((num, index) => (
					<React.Fragment key={index}>
						{index === 0 && firstPageInGroup > pagesPerGroup && (
							<button
								key={`prev-${
									firstPageInGroup - pagesPerGroup
								}-${index}`}
								className="mx-0.5 text-sm px-1 py-1 hover:text-white text-gray-700"
								onClick={() => goToPage(firstPageInGroup - 1)}
							>
								...
							</button>
						)}
						<button
							key={num}
							className={`mx-0.5 text-sm px-1 py-1 hover:text-white ${
								num === page ? 'text-white' : 'text-gray-700'
							}`}
							onClick={() => goToPage(num)}
						>
							{num}
						</button>
						{index === lastPageInGroup - firstPageInGroup &&
							lastPageInGroup < totalPages && (
								<button
									key={`next-${lastPageInGroup + 1}-${index}`}
									className="mx-0.5 text-sm px-1 py-1 hover:text-white text-gray-700"
									onClick={() =>
										goToPage(lastPageInGroup + 1)
									}
								>
									...
								</button>
							)}
					</React.Fragment>
				))}
		</div>
	);
}
