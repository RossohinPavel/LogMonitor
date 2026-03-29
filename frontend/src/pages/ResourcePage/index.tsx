import { Divider } from "@mui/material";
import { Navigate, useParams } from "react-router";
import { routes } from "../routes";
import { ResourceContextProvider } from "../../contexts/ResourceContext/privider";
import { Header } from "../../components/Resource/Header";
import { useResource } from "../../hooks/useResource";
import { Body } from "../../components/Resource/Body";


export const ResourcePage = () => {
  const { slug } = useParams() as { slug: string };

  const { resource } = useResource(slug);

  if ( !resource ) {
    return <Navigate to={routes.getMainPage()} />
  }

  return (
    <ResourceContextProvider resource={resource!}>
      <Header />
      <Divider sx={{ mb: 0.5 }}/>
      <Body/>
    </ResourceContextProvider>
  );
};

