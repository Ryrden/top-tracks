import Link from "next/link";
import React from "react";
export default function Footer() {
	return <footer className="xs:text-sm sm:text-lg text-center pb-2 sticky top-[100vh]">
		<p>
            {/* TODO: Adicionar marcação de Link clicavel depois */}
            Made with 💙 by <Link href="https://github.com/ryrden">Ryrden</Link> and <Link href="https://github.com/lettymoon">Lettymoon</Link> 
        </p>
	</footer>;
}
