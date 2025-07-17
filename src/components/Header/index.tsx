import { HeaderContainer } from "./style";

export function Header() {
  return (
    <HeaderContainer className="w-full bg-white shadow p-4 text-center">
      <span className="text-xl font-bold">OrganizaDoc</span>
      <form>
        <input type="file" name="sendDocument" id="" />
        <button type="submit">Enviar Documento</button>
      </form>
    </HeaderContainer>
  );
}
