"use client";

import { Loader } from "~/components/loader";
import { FormInput } from "~/components/ui/form-input";

const questions = new Array(5).fill(null).map((_, i) => i + 1);

export default function Form() {
	return (
		<section className="w-full flex flex-col justify-center h-screen relative">
			<title>Form</title>
			<Loader progress={50} />
			<FormInput
				label="First off, what's your email address?"
				type="email"
				value=""
				onChange={() => {}}
			/>
		</section>
	);
}
