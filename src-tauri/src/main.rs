#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod internal {
    pub mod crypto;
}

// use internal::crypto::{decrypt, encrypt};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Account {
    username: String,
    email: String,
    password: String,
    phone: String,
    notes: Vec<String>,
    tags: Vec<String>,
}

/*
#[tauri::command]
fn encrypt_<T: Serialize>(key_str: &str, plaintext: T) -> Result<String, String> {
    encrypt(key_str, &plaintext)
}

#[tauri::command]
fn decrypt_(key_str: &str, encrypted_data: &str) -> Result<Account, String> {
    decrypt(key_str, encrypted_data)
}
*/

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
