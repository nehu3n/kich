import { Store } from "@tauri-apps/plugin-store";
import { compare, hash } from "bcrypt-ts";

const store = new Store("masterkey.bin");
const MASTER_KEY_NAME = "master_key";

async function getMasterKey(): Promise<string | null> {
  return await store.get(MASTER_KEY_NAME);
}

async function checkMasterKey(password: string): Promise<boolean> {
  const masterKey = await getMasterKey();

  if (masterKey == null) {
    return false;
  }

  return await compare(password, masterKey);
}

async function removeMasterKey(): Promise<boolean> {
  return await store.delete(MASTER_KEY_NAME);
}

async function hasMasterKey(): Promise<boolean> {
  return await store.has(MASTER_KEY_NAME);
}

async function setMasterKey(password: string) {
  const hash_password = await hash(password, 10);

  if (await store.has(MASTER_KEY_NAME)) {
    return new Error("Master key already exists");
  }

  await store.set(MASTER_KEY_NAME, hash_password);
}

export {
  getMasterKey,
  checkMasterKey,
  removeMasterKey,
  hasMasterKey,
  setMasterKey,
};
