import { useMemo } from "react";
import { useAppContext } from "../contexts/AppContext/context"
import { useParams } from "react-router";

export const useResource = (slug: string) => {
  const { resources } = useAppContext();

  const resource = useMemo(() => resources?.[slug], [slug, resources]);

  const {slug: slugFromPath } = useParams() as { slug: string }

  const isSelected = useMemo(() => {
    return slug === slugFromPath;
  }, [slug, slugFromPath]);

  return { resource, isSelected }
}