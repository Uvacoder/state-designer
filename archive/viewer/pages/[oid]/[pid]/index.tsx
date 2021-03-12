import { useRouter } from "next/router"
import useSWR from "swr"
import { useUser } from "../../../auth/useUser"
import dynamic from "next/dynamic"

const Site = dynamic(() => import("../../../site/viewer"), {
  ssr: false,
})

const deadFetcher = () => {
  return undefined
}

const fetcher = (url: string, token: string) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json())

const Index = () => {
  const router = useRouter()

  const { oid, pid } = router.query

  const { user } = useUser()

  const { data } = useSWR(
    [`/api/${oid}/${pid}?uid=${user?.id}`, user?.token],
    pid ? fetcher : deadFetcher
  )

  return <Site data={data} />
}

export default Index
