import * as React from "react";

import { cn } from "~/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex w-full bg-transparent pt-1 pb-2 text-2xl transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:opacity-50 placeholder:text-blue-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-b focus-visible:border-b-2 text-blue-600 border-blue-200 focus-visible:border-blue-600",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
