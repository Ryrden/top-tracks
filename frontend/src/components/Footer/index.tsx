"use client";

import Link from "next/link";
import React from "react";
export default function Footer() {
	return <footer className="text-center">
		<p>
            {/* TODO: Adicionar marcação de Link clicavel depois */}
            Made with 💙 by <Link href="https://github.com/ryrden">Ryrden</Link> and <Link href="https://github.com/lettymoon">Lettymoon</Link> 
        </p>
	</footer>;
}
