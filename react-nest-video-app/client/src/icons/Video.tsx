import * as React from 'react';

function VideoIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			className="prefix__feather prefix__feather-video"
			width="1em"
			height="1em"
			{...props}
		>
			<path d="M23 7l-7 5 7 5V7z" />
			<rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
		</svg>
	);
}

export default VideoIcon;
