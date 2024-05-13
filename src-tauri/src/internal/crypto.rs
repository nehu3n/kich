use aes_gcm::{
    aead::{Aead, AeadCore, KeyInit, OsRng},
    Aes256Gcm, Key, Nonce,
};
use serde::{Deserialize, Serialize};
use serde_json;

use crate::Account;

pub fn encrypt<'a, T: Serialize>(key_str: &'a str, plaintext: &'a T) -> Result<String, String> {
    let key = Key::<Aes256Gcm>::from_slice(key_str.as_bytes());
    let nonce = Aes256Gcm::generate_nonce(&mut OsRng);

    let cipher = Aes256Gcm::new(key);

    let plaintext_json = serde_json::to_string(plaintext).map_err(|e| e.to_string())?;
    let ciphered_data = cipher
        .encrypt(&nonce, plaintext_json.as_bytes())
        .map_err(|e| e.to_string())?;

    let mut encrypted_data: Vec<u8> = nonce.to_vec();
    encrypted_data.extend_from_slice(&ciphered_data);

    Ok(hex::encode(encrypted_data))
}

pub fn decrypt<T: for<'a> Deserialize<'a>>(
    key_str: &str,
    encrypted_data: &str,
) -> Result<Account, String> {
    let encrypted_data = hex::decode(encrypted_data).map_err(|e| e.to_string())?;

    let key = Key::<Aes256Gcm>::from_slice(key_str.as_bytes());

    let (nonce_arr, ciphered_data) = encrypted_data.split_at(12);
    let nonce = Nonce::from_slice(nonce_arr);
    let cipher = Aes256Gcm::new(key);

    let plaintext = cipher
        .decrypt(nonce, ciphered_data)
        .map_err(|e| e.to_string())?;
    let plaintext_str = String::from_utf8(plaintext).map_err(|e| e.to_string())?;

    serde_json::from_str(&plaintext_str.to_string()).map_err(|e| e.to_string())
}
