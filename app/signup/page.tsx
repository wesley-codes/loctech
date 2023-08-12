"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  useTheme,
} from "../lib/mui";
import { tokens } from "../lib/theme";
import { Visibility, VisibilityOff, Google, GitHub } from "@mui/icons-material";
import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema } from "../lib/yup";
import { SignUpType } from "../types/_types";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Spinner from "../components/Spinner";

export default function Page() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const router = useRouter();
  const [error, setError] = React.useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession() as unknown as any;

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect to homepage if logged in
    }
  }, [status, router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const formSubmitHandler = (value: SignUpType) => {
    setLoading(true);
    const emailToLowerCase = value.email.toLowerCase();
    const data = {
      name: value.name,
      email: emailToLowerCase,
      password: value.password,
    };
    axios
      .post("/api/register", data)
      .then((response) => {
        // Request was successful
        if (response.data) {
          router.push("/signIn");
        }
        setLoading(false);
      })
      .catch((error) => {
        // An error occurred
        setError("An error occurred");
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <Grid container item md={12} justifyContent="center" m="2rem 0">
        {loading ? (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-gray-800 opacity-50"></div>

            <div className="bg-white p-6 rounded shadow-lg w-64">
              <Spinner />
            </div>
          </div>
        ) : (
          <Grid
            item
            container
            // justifyContent="center"
            direction="column"
            alignItems="center"
            md={4}
            padding="2rem"
            borderRadius="8px"
            sx={{ backgroundColor: colors.primary[100] }}
          >
            <Box m="1.5rem 0">
              <Typography variant="h3" fontWeight="bold" fontStyle="italic">
                Hello!
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Create your account
              </Typography>
            </Box>
            <Grid container rowSpacing={4} m="2rem 0">
              <Grid container item>
                <TextField
                  id="name"
                  error={!!errors.name}
                  placeholder="JohnDoe"
                  label="Name"
                  helperText={errors.name?.message}
                  variant="outlined"
                  autoComplete="false"
                  fullWidth
                  {...register("name")}
                />
              </Grid>

              {/* first input */}
              <Grid container item>
                <TextField
                  id="email"
                  error={!!errors.email}
                  placeholder="JohnDoe @gmail.com"
                  label="Email"
                  helperText={errors.email?.message}
                  variant="outlined"
                  autoComplete="false"
                  fullWidth
                  {...register("email")}
                />
              </Grid>

              {/* second  input */}
              <Grid container item>
                <TextField
                  className="passwordInput"
                  id="password"
                  label="Password"
                  variant="outlined"
                  autoComplete="false"
                  type={showPassword ? "password" : "text"}
                  {...register("password")}
                  helperText={errors.password?.message}
                  error={!!errors.password}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {showPassword ? (
                          <IconButton onClick={() => setShowPassword(false)}>
                            <Visibility />
                          </IconButton>
                        ) : (
                          <IconButton onClick={() => setShowPassword(true)}>
                            <VisibilityOff />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/*  */}

              <Grid container item>
                <TextField
                  id="consfirmpassword"
                  label="Confirm password"
                  variant="outlined"
                  autoComplete="false"
                  type={showConfirmPassword ? "password" : "text"}
                  {...register("confirmPassword")}
                  helperText={errors.confirmPassword?.message}
                  error={!!errors.confirmPassword}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {showConfirmPassword ? (
                          <IconButton
                            onClick={() => setShowConfirmPassword(false)}
                          >
                            <Visibility />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() => setShowConfirmPassword(true)}
                          >
                            <VisibilityOff />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            {/*  */}

            {/* button */}

            <Grid container m="1rem 0">
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "#fff",
                  p: "10px",
                  backgroundColor: colors.rose[500],
                  "&:hover": {
                    backgroundColor: colors.rose[600],
                  },
                }}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid container justifyContent="center">
              <Typography color="red">{error}</Typography>
            </Grid>
            {/*  */}

            <Grid
              container
              item
              alignItems="center"
              justifyContent="center"
              m="1rem 0"
            >
              <hr style={{ border: "1px solid black", width: "20px" }} />
              <Typography m="5px"> Or Sign up with</Typography>{" "}
              <hr style={{ border: "1px solid black", width: "20px" }} />
            </Grid>

            {/* buttons */}
            <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid container item md={6} sm={12}>
                <Button
                  variant="contained"
                  onClick={() => signIn("google")}
                  fullWidth
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: colors.rose[500],
                    "&:hover": {
                      backgroundColor: colors.rose[600],
                    },
                  }}
                >
                  {" "}
                  <Google />
                  Google{" "}
                </Button>
              </Grid>

              {/*  */}
              <Grid container item md={6} sm={12}>
                <Button
                  variant="contained"
                  onClick={() => signIn("github")}
                  fullWidth
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: colors.rose[500],
                    "&:hover": {
                      backgroundColor: colors.rose[600],
                    },
                  }}
                >
                  {" "}
                  <GitHub />
                  Github{" "}
                </Button>
              </Grid>
              {/*  */}
            </Grid>

            <Grid container justifyContent="center" m="1rem 0">
              <Typography>
                Already have an account?{" "}
                <Link
                  href="/signIn"
                  style={{
                    textDecoration: "underline",
                    color: colors.rose[500],
                  }}
                >
                  Log in
                </Link>
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </form>
  );
}
