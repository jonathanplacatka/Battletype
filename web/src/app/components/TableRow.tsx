interface TableRowProps {
  index: number;
  wpm: number;
  username: string;
  score: number;
};

export default function TableRow({index, wpm, username, score} : TableRowProps ) {
	return (
		<tr>
			<td className='py-3 pl-4'>
				<span className=''>
					{index === 0 ? 1 : index + 1}
				</span>
			</td>
			<td className='px-2 md:px-0'>
				<div className='flex items-center gap-2'>
					{username}
				</div>
			</td>
			<td className='px-2 text-bg md:px-0'>
				<span className={('rounded-md bg-bg px-2 py-1 text-xs text-hl')}>
					{wpm}
				</span>
			</td>
			<td className='hidden px-2 text-sm text-bg sm:table-cell md:px-0'>
				{score}
			</td>
		</tr>
	);
};
