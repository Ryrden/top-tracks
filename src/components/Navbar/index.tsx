import Link from "next/link";
import React from "react";
export default function Navbar() {
	return <nav className="flex justify-center pt-4">
		<ul className="flex xs:gap-4 sm:gap-8">
			<li className="xs:text-sm sm:text-lg">
				<Link href="/">Home</Link>
			</li>
			<li className="xs:text-sm sm:text-lg">
				<Link href="/about">About</Link>
			</li>
			<li className="xs:text-sm sm:text-lg">
				<Link href="/privay-policy">Privacy Policy</Link>
			</li>
			<li className="xs:text-sm sm:text-lg">
				<Link href="/contact">Contact</Link>
			</li>
		</ul>
	</nav>;
}
