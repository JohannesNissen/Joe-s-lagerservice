import useItemContext from "contexts/useItemContext";
import useUserContext from "contexts/useUserContext";
import { NextPage } from "next";
import router, { useRouter } from "next/router";
import { useEffect } from "react";

const IndexPage: NextPage = () => {
  const { items, fetchItems, saveNewItem } = useItemContext();
  const { user, fetchUserProfile } = useUserContext();

  useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchUserProfile(parseInt(id));
  }, [fetchUserProfile, id]);

  return <></>;
};

export default IndexPage;
