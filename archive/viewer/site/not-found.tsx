import * as React from "react"
import { Flex, Button, Box, BoxProps } from "theme-ui"
import { createProject } from "../utils/firebase"
import { useStateDesigner } from "@state-designer/react"
import LoadingScreen from "./loading-screen"
import { useRouter } from "next/router"

const NotFound: React.FC<{ uid: string; pid: string } & BoxProps> = ({
  uid,
  pid,
  children,
  ...props
}) => {
  const state = useStateDesigner({
    initial: "idle",
    states: {
      idle: {
        on: {
          CREATED_NEW_PROJECT: { to: "loading" },
        },
      },
      loading: {
        async: {
          await: (_, { uid, pid }) => createProject(pid, uid),
          onResolve: { to: "success" },
          onReject: { to: "error" },
        },
      },
      success: {},
      error: {
        on: {
          CREATED_NEW_PROJECT: { to: "loading" },
        },
      },
    },
  })

  const router = useRouter()

  React.useEffect(() => {
    if (state.isIn("success")) {
      router.push(`/${uid}/${pid}`)
    }
  }, [state.active])

  return (
    <Flex variant="fullView">
      {state.whenIn({
        idle: (
          <Box>
            <p>
              I couldn't find that project.
              <br />
              Would you like to create one instead?
            </p>
            <Button
              onClick={() => state.send("CREATED_NEW_PROJECT", { uid, pid })}
            >
              Create Project
            </Button>
            <Button onClick={() => router.push("/user")} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        ),
        success: null,
        loading: <LoadingScreen>Creating Project...</LoadingScreen>,
        error: (
          <Box>
            <p>
              Something went wrong while creating that project.
              <br />
              Would you like to try again?
            </p>
            <Button
              onClick={() => state.send("CREATED_NEW_PROJECT", { uid, pid })}
            >
              Create Project
            </Button>
          </Box>
        ),
      })}
    </Flex>
  )
}

export default NotFound
