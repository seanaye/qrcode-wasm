use qrcodegen::QrCode;
use qrcodegen::QrCodeEcc;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
  return a + b;
}

#[wasm_bindgen]
pub struct QrContainer {
  pub size: i32,
  memory: Vec<u8>,
}

#[wasm_bindgen]
impl QrContainer {

  pub fn new(s: &str) -> QrContainer {
    let qr = QrCode::encode_text(s, QrCodeEcc::Low).unwrap();

    let size = qr.size();
    let length = size.pow(2);
    let mut memory = Vec::with_capacity(length as usize);
    for y in 0..size {
      for x in 0..size {
        memory.push(if qr.get_module(x, y) {
          1 as u8
        } else {
          0 as u8
        });
      }
    }
    return QrContainer { size, memory };
  }

  pub fn read(&self) -> js_sys::Uint8Array {
    return js_sys::Uint8Array::from(&self.memory[..]);
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn it_works() {
    let result = add(1, 2);
    assert_eq!(result, 3);
  }
}
