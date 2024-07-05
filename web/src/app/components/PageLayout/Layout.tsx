
import Header from "./Header";

export default function Layout({children}: Readonly<{children: React.ReactNode;}>)
  {
    return (
		<div className="layout">
			<Header />
			<main>{children}</main>
		</div>     
    );
  }
