import React from 'react';
import { Search } from 'lucide-react';
const Searchbar = () => {
	return (
		<form className="w-1/2 absolute top-32">
			<label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
				Search
			</label>
			<div className="relative">
				<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
					<Search />
				</div>
				<input
					className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
					type="search"
					id="default-search"
					placeholder="Search..."
					required
				/>
				<button
					type="submit"
					className="text-white absolute end-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-non font-medium rounded-lg text-sm px-4 py-2"
				>
					Search
				</button>
			</div>
		</form>
	);
};

export default Searchbar;
