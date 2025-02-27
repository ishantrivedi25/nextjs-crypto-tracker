import ClientComponent from "./clientComponent";

export default async function Page({ params }) {
    const id = (await params).id;

    return <ClientComponent id={id} />;
}
