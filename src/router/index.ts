import { createRouter, createWebHashHistory } from "vue-router";
import { WelcomeIndex } from "../pages/welcome";
import { UserIndex, UserCreate, UserShow, UserUpdate } from "../pages/users";
import { TeamIndex, TeamCreate, TeamShow, TeamUpdate } from "../pages/teams";

const routes = [
  {
    name: "welcome",
    path: "/",
    component: WelcomeIndex,
  },
  {
    name: "users",
    path: "/users",
    component: UserIndex,
  },
  {
    name: "createUser",
    path: "/users/create",
    component: UserCreate,
  },
  {
    name: "showUser",
    path: "/users/:userId",
    component: UserShow,
  },
  {
    name: "updateUser",
    path: "/users/:userId/update",
    component: UserUpdate,
  },
  {
    name: "teams",
    path: "/teams",
    component: TeamIndex,
  },
  {
    name: "createTeam",
    path: "/teams/create",
    component: TeamCreate,
  },
  {
    name: "showTeam",
    path: "/teams/:teamId",
    component: TeamShow,
  },
  {
    name: "updateTeam",
    path: "/teams/:teamId/update",
    component: TeamUpdate,
  },
];

function getBasePath(): string {
  const { pathname } = window.location;
  return pathname.substring(0, pathname.lastIndexOf("/") + 1);
}

const router = createRouter({
  history: createWebHashHistory(getBasePath()),
  routes,
});

export default router;
