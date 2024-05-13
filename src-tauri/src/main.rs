#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod internal {
    pub mod crypto;
    pub mod db {
        pub mod accounts;
    }
}

use internal::db::accounts::{
    add_account, delete_account, get_account, get_all_accounts, update_account,
};
use polodb_core::results::{DeleteResult, UpdateResult};
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

#[tauri::command]
fn add_account_(account: Account, password: &str, id: &str) {
    add_account(&account, password, id);
}

#[tauri::command]
fn get_account_(password: &str, id: &str) -> Account {
    return get_account(password, id);
}

#[tauri::command]
fn get_all_accounts_(password: &str) -> Vec<Account> {
    return get_all_accounts(password);
}

#[tauri::command]
fn delete_account_(id: &str) -> DeleteResult {
    return delete_account(id);
}

#[tauri::command]
fn update_account_(password: &str, id: &str, account: Account) -> UpdateResult {
    return update_account(password, id, &account);
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
        .setup(|_app| {
            internal::db::accounts::init();

            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            add_account_,
            get_account_,
            get_all_accounts_,
            delete_account_,
            update_account_
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
