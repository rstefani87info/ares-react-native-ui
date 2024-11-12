import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest } from "../store/actions";
import Flash from "./Flash";
import Loading from "./output/Loading";

export default function CacheComponent({
  key,
  initialValue,
  fetchFunction,
  resultsOrganizeFunction,
  refreshRate,
  children,
}) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cache[key]);
  const error = useSelector((state) => state.cache.error);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchDataRequest(fetchFunction, organizeFunction, key, refreshRate)
    );
    setLoading(false);
  }, [dispatch, setLoading, fetchFunction, organizeFunction, key, refreshRate]);

  return (
    <>
      {loading && <Loading />}
      {error && <Flash text={error} />}
      {data && children(data)}
    </>
  );
}
