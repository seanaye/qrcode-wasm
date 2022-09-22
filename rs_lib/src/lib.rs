use qrcodegen::QrCode;
use qrcodegen::QrCodeEcc;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
  return a + b;
}

#[wasm_bindgen]
pub fn encode(s: &str) -> js_sys::Uint8Array {
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
  return js_sys::Uint8Array::from(&memory[..]);
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
