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

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .setup(|_app| {
            internal::db::accounts::init();

            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            // Accounts
            add_account,
            get_account,
            get_all_accounts,
            delete_account,
            update_account,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
