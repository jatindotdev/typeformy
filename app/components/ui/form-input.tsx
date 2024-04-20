import { ArrowRight, Check } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { AnimatePresence, motion } from "framer-motion";

interface FormInputProps {
	label: string;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
	label,
	type,
	value,
	onChange,
}) => {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="h-screen w-screen flex items-center justify-center snap-start p-4"
			>
				<div className="flex gap-3 items-start justify-start -mt-16">
					<div className="flex justify-center items-center font-light text-blue-800 pt-1">
						<span className="text-base">1</span>
						<ArrowRight className="size-5" strokeWidth={1.8} />
					</div>
					<div>
						<h1 className="text-2xl mb-6">
							First off, what's your email address?
						</h1>
						<Input
							type="email"
							placeholder="name@example.com"
							className="mb-3"
						/>
						<div className="flex items-center gap-2">
							<Button className="gap-1">
								OK
								<Check className="size-5" strokeWidth={2.5} />
							</Button>
							<span className="text-xs">
								press <strong>Enter</strong> ↵
							</span>
						</div>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};
