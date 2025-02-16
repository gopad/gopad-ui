import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth";

const routes = [
  {
    name: "welcome",
    path: "/",
    component: () => import('../pages/welcome/Index.vue'),
    meta: { requiresAuth: true },
  },
  {
    name: "users",
    path: "/users",
    component: () => import('../pages/users/Index.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    name: "createUser",
    path: "/users/create",
    component: () => import('../pages/users/Create.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    name: "showUser",
    path: "/users/:userId",
    component: () => import('../pages/users/Show.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    name: "updateUser",
    path: "/users/:userId/update",
    component: () => import('../pages/users/Update.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    name: "teams",
    path: "/teams",
    component: () => import('../pages/teams/Index.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    name: "createTeam",
    path: "/teams/create",
    component: () => import('../pages/teams/Create.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    name: "showTeam",
    path: "/teams/:teamId",
    component: () => import('../pages/teams/Show.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    name: "updateTeam",
    path: "/teams/:teamId/update",
    component: () => import('../pages/teams/Update.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },

  {
    name: "signin",
    path: "/auth/signin",
    component: () => import('../pages/profile/Signin.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthed) {
    next({ name: "signin", query: { redirect: to.fullPath } });
  } else {
    if (to.meta.requiresAdmin && !authStore.isAdmin) {
      next({ name: "welcome" });
    } else {
      next();
    }
  }
});

export default router;
