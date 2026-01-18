import { useLang } from "@repo/language/hooks";
import { Link } from "@repo/language/navigation";
import { AppLogo } from "@repo/ui-new";

export const Footer = () => {
  const t = useLang();

  return (
    <footer className="bg-background border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <AppLogo width={100} height={100} />
            <p className="text-muted-foreground text-sm">{t.page.lp("footer.description")}</p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">{t.page.lp("footer.product.title")}</h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href="/plans" className="hover:text-foreground transition-colors">
                  {t.page.lp("footer.product.plans")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  {t.page.lp("footer.product.features")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">{t.page.lp("footer.company.title")}</h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  {t.page.lp("footer.company.about")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  {t.page.lp("footer.company.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">{t.page.lp("footer.legal.title")}</h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  {t.page.lp("footer.legal.privacy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  {t.page.lp("footer.legal.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
          <p>
            © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SYSTEM_NAME}
            {"."}
            {t.page.lp("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};
