'use client';
import { React, useState } from 'react';
import { Search } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Rating } from '@mui/material';

const Searchbar = ({ onSearchResults }) => {
	const [rating, setRating] = useState(1);
	const [checked, setChecked] = useState(false);
	const [sentiment, setSentiment] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [sorting, setSorting] = useState('Defualt');

	const handleAutoexp = (event) => {
		setChecked(event);
	};

	const handleSorting = (event) => {
		setSorting(event.target.value);
	};

	const handleSearchValue = (event) => {
		setSearchValue(event.target.value);
	};

	const apiRequest = async () => {
		try {
			// Prepare the data to be sent in the request body
			const requestData = {
				searchValue,
				rating,
				checked,
				sentiment,
			};

			// Effettua la chiamata API per eseguire la query e avere la risposta
			const response = await fetch('http://localhost:5000/api/search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestData),
			});

			const apiResults = await response.json();
			console.log(apiResults);
			onSearchResults(JSON.stringify(apiResults.message));
		} catch (error) {
			console.error('Errore durante la chiamata API:', error);
		}
	};

	return (
		<div className="w-full absolute top-20 flex flex-col">
			<div className="flex flex-row justify-between">
				<div className="w-full mx-4">
					<label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
						Search
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
							<Search />
						</div>
						<input
							className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
							type="text"
							id="default-search"
							placeholder="Search..."
							required
							value={searchValue}
							onChange={handleSearchValue}
						/>
						<button
							className="text-white absolute end-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-non font-medium rounded-lg text-sm px-4 py-2"
							onClick={apiRequest}
						>
							Search
						</button>
					</div>
				</div>
				<div className="w-full mx-4">
					<label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
						Search
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
							<Search />
						</div>
						<input
							className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
							type="text"
							id="default-search"
							placeholder="Search..."
							required
							value={searchValue}
							onChange={handleSearchValue}
						/>
						<button
							className="text-white absolute end-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-non font-medium rounded-lg text-sm px-4 py-2"
							onClick={apiRequest}
						>
							Search
						</button>
					</div>
				</div>
			</div>
			<div className="flex flex-row w-1/2 justify-between mt-6">
				<div>
					<select
						value={sorting}
						onChange={handleSorting}
						className="rounded p-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-200 hover:dark:bg-slate-500 text-black dark:text-white"
					>
						<option value={'Default'}>Default</option>
						<option value={'ReviewDate'}>Review Date</option>
						<option value={'ReviewStars'}>Review Stars</option>
					</select>
				</div>
				<div className="flex flex-col items-center">
					<label>Ratings</label>
					<Rating
						name="simple-controlled"
						value={rating}
						onChange={(event, newRating) => {
							setRating(newRating);
						}}
					/>
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox
						id="autoexp"
						checked={checked}
						onCheckedChange={handleAutoexp}
					/>
					<label>Auto Expantion</label>
				</div>
			</div>
		</div>
	);
};

export default Searchbar;
