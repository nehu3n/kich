use std::fs;
use std::path::Path;

use polodb_core::{bson::doc, results::{DeleteResult, UpdateResult}, Database};
use serde::{Deserialize, Serialize};

use crate::{
    internal::crypto::{decrypt, encrypt},
    Account,
};

pub fn init() {
    if !db_file_exists() {
        create_db_file();
    }
}

fn create_db_file() {
    let db_path = get_db_path();
    let db_dir = Path::new(&db_path).parent().unwrap();

    if !db_dir.exists() {
        fs::create_dir_all(db_dir).unwrap();
    }

    fs::File::create(db_path).unwrap();
}

fn db_file_exists() -> bool {
    let db_path = get_db_path();
    Path::new(&db_path).exists()
}

fn get_db_path() -> String {
    let home_dir = dirs::home_dir().unwrap();
    home_dir.to_str().unwrap().to_string() + "/.kich/accounts.db"
}

fn open_db() -> Database {
    let db_path = get_db_path();
    return Database::open_file(db_path).unwrap();
}

#[derive(Serialize, Deserialize, Debug)]
struct InsertAccount {
    id: String,
    account_data: String,
}

pub fn add_account(account: &Account, password: &str, id: &str) {
    let db: Database = open_db();

    let collection = db.collection::<InsertAccount>("accounts");

    let accounts: Result<polodb_core::ClientCursor<InsertAccount>, polodb_core::Error> =
        collection.find(None);
    if let Ok(account_list) = accounts {
        let mut already_exists = false;
        account_list.for_each(|acc| {
            if acc.as_ref().unwrap().id == id {
                already_exists = true;
            }
        });

        if already_exists {
            return;
        }

        let account_data = encrypt(password, account).unwrap();

        collection
            .insert_one(InsertAccount {
                id: id.to_string(),
                account_data: account_data,
            })
            .unwrap();
    }
}

pub fn get_account(password: &str, id: &str) -> Account {
    let db = open_db();

    let collection = db.collection::<InsertAccount>("accounts");

    let accounts = collection.find(None);

    let mut account_data = Account {
        username: String::new(),
        email: String::new(),
        password: String::new(),
        phone: String::new(),
        notes: vec![],
        tags: vec![],
    };

    if let Ok(account) = accounts {
        account.for_each(|acc| {
            let acc = acc.unwrap();
            if acc.id == id {
                account_data = decrypt::<Account>(password, &acc.account_data).unwrap();
            }
        });
    }

    account_data
}

pub fn get_all_accounts(password: &str) -> Vec<Account> {
    let db = open_db();

    let collection = db.collection::<InsertAccount>("accounts");

    let accounts = collection.find(None);

    let mut account_list = vec![];

    if let Ok(account) = accounts {
        account.for_each(|acc| {
            let acc = acc.unwrap();
            account_list.push(decrypt::<Account>(password, &acc.account_data).unwrap());
        });
    }

    account_list
}

pub fn delete_account(id: &str) -> DeleteResult {
    let db = open_db();

    let collection = db.collection::<InsertAccount>("accounts");

    return collection
        .delete_one(doc! {
            "id": id.to_string(),
        })
        .unwrap();
}

pub fn update_account(password: &str, id: &str, account: &Account) -> UpdateResult {
    let db = open_db();

    let collection = db.collection::<InsertAccount>("accounts");

    return collection
        .update_many(
            doc! {
                "id": id.to_string()
            },
            doc! {
                "$set": doc! {
                    "account_data": encrypt(password, account).unwrap(),
                },
            },
        )
        .unwrap();
}
