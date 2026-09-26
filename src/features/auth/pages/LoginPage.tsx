import { useState } from "react";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { EnvelopeOpen, Eye, LockFill } from "@gravity-ui/icons";

import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login({
        email,
        password,
      });

      navigate("/", { replace: true });
    } catch {
      // * error is manage by store
    }
  };

  return (
    <main className="min-h-svh overflow-hidden bg-white lg:grid lg:grid-cols-[40%_60%]">
      {/* =====================================================
          PANEL IZQUIERDO
          ====================================================== */}
      <section className="relative hidden min-h-svh overflow-hidden lg:flex">
        {/* Fondo */}
        <div className="absolute inset-0 bg-linear-to-br from-[#151b78] via-[#3424ad] to-[#c026a6]" />

        {/* Glow */}
        <div className="absolute -bottom-48 -left-40 h-150 w-150 rounded-full bg-fuchsia-500/30 blur-3xl" />

        <div className="relative z-10 flex min-h-svh w-full flex-col px-12 py-10 xl:px-14">
          {/* Logo */}
          <div className="flex w-full justify-center pt-10">
            <img
              src="/brand/invitame-logo-white-text.png"
              alt="Invíteme"
              className="w-80 -translate-x-10 xl:-translate-x-20 object-contain"
            />
          </div>

          {/* Contenido */}
          <div className="flex flex-1 items-center">
            <div className="max-w-md">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-fuchsia-300">
                Administración
              </p>

              <h2 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-white xl:text-5xl">
                Tus eventos.
                <br />
                Tus invitados.
                <br />
                Todo en un solo
                <br />
                lugar.
              </h2>

              <p className="mt-6 max-w-sm text-base leading-7 text-white/70">
                Crea y administra tus eventos, gestiona tus invitaciones y
                comparte cada detalle fácilmente.
              </p>
            </div>
          </div>

          {/* Ondas */}
          <div className="pointer-events-none absolute bottom-0 left-0 h-60 w-full overflow-hidden">
            <div className="absolute -bottom-32 -left-24 h-56 w-[140%] rounded-[50%] border-t border-white/25" />

            <div className="absolute -bottom-40 -left-20 h-56 w-[140%] rounded-[50%] border-t border-white/20" />

            <div className="absolute -bottom-48 -left-16 h-56 w-[140%] rounded-[50%] border-t border-white/15" />

            <div className="absolute -bottom-56 -left-12 h-56 w-[140%] rounded-[50%] border-t border-white/10" />
          </div>

          {/* Copyright */}
          <p className="relative text-xs text-white/50">
            © 2026 Invítame. Todos los derechos reservados.
          </p>
        </div>

        {/* Curva blanca */}
        <div
          className="
absolute
-right-28
-top-[5%]
h-[110%]
w-56
rounded-[50%]
bg-white
"
        />
      </section>

      {/* =====================================================
          PANEL DERECHO
          ====================================================== */}
      <section className="flex min-h-svh min-w-0 items-center justify-center bg-white px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-lg">
          {/* Encabezado */}
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#11175f]">
              Administración
            </p>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#11175f]">
              Bienvenido de nuevo
            </h1>

            <p className="mt-3 text-base text-[#8589a8]">
              Ingresa tus credenciales para continuar.
            </p>
          </div>

          {/* Formulario */}
          <Form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}
            validationBehavior="native"
          >
            {/* Email */}
            <TextField
              name="email"
              type="email"
              value={email}
              onChange={setEmail}
              isRequired
              className="w-full"
            >
              <Label className="text-sm font-semibold text-[#11175f]">
                Correo electrónico
              </Label>

              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
                  <EnvelopeOpen className="text-[#6b70a8]" />
                </div>

                <Input
                  placeholder="nombre@empresa.com"
                  autoComplete="email"
                  className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-[#dfe1ef]
                  bg-white
                  pl-12
                  pr-4
                  text-base
                  text-[#11175f]
                  shadow-sm
                  transition-all
                  focus-within:border-[#7045e8]
                  focus-within:shadow-md
                  "
                />
              </div>

              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              type="password"
              value={password}
              onChange={setPassword}
              isRequired
              className="w-full"
            >
              <Label className="text-sm font-semibold text-[#11175f]">
                Contraseña
              </Label>

              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
                  <LockFill className="text-[#6b70a8]" />
                </div>

                <Input
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password"
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-[#dfe1ef]
                    bg-white
                    pl-12
                    pr-12
                    text-base
                    text-[#11175f]
                    shadow-sm
                    transition-all
                    focus-within:border-[#7045e8]
                    focus-within:shadow-md
                    "
                />

                <div className="pointer-events-none absolute right-4 top-1/2 z-10 -translate-y-1/2">
                  <Eye className="text-[#6b70a8]" />
                </div>
              </div>

              <FieldError />
            </TextField>

            {/* Error */}
            {error && (
              <div className="w-full rounded-2xl border border-danger/20 bg-danger/5 px-4 py-3">
                <p className="text-sm text-danger">{error}</p>
              </div>
            )}

            {/* Botón */}
            <Button
              type="submit"
              variant="primary"
              isPending={isLoading}
              className="
                mt-2
                h-14
                w-full
                rounded-2xl
                bg-linear-to-r
                from-[#5428e5]
                to-[#d11bb5]
                text-base
                font-bold
                text-white
                shadow-lg
                shadow-purple-500/20
                transition-all
                hover:scale-[1.01]
                hover:shadow-xl
                hover:shadow-purple-500/25
                "
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </Form>

          {/* Seguridad */}
          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-[#9699b3]">
            <LockFill className="size-4" />
            <span>Acceso exclusivo para administradores</span>
          </div>
        </div>
      </section>
    </main>
  );
}
