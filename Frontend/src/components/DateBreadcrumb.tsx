import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export function DateBreadcrumb() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("pt-PT", {
    month: "long",
    year: "numeric",
  });
  const formatted = formatter.format(now);
  let mes = "", ano = "";
  if (formatted.includes(" de ")) {
    [mes, ano] = formatted.split(" de ");
  } else {
    [mes, ano] = formatted.split(" ");
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>
            {`${mes?.toUpperCase()} ${ano}`}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}