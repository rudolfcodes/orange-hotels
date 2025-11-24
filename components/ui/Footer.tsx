import { footerMenu } from "@/lib/menu";

const Footer = () => {
  return (
    <footer id="footer" className="bg-dark-slate text-white w-full mt-16">
      <ul className="flex flex-wrap list-style-none justify-center gap-8 p-8">
        {footerMenu.map((column) => (
          <li key={column.title} className="min-w-[150px]">
            <h3 className="mb-4 font-semibold">{column.title}</h3>
            <ul className="space-y-2">
              {column.links.map((link) => {
                return (
                  <li key={link.label}>
                    <a href={link.link} className="hover:underline">
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
