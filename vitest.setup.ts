import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(cleanup); // each test renders into a clean document
