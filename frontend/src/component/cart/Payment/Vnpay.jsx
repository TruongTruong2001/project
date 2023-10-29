import React, { useState } from 'react';

const Vnpay = () => {
  const [amount, setAmount] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [language, setLanguage] = useState('vn');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleBankCodeChange = (e) => {
    setBankCode(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thực hiện các hành động cần thiết khi người dùng nhấn nút Thanh toán
    // Ví dụ: gửi dữ liệu đến server hoặc thực hiện thanh toán qua API
  };

  return (
    <div className="container">
      <h3>title</h3>
      <div className="table-responsive">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <span htmlFor="amount">Số tiền</span>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              placeholder="Số tiền"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>

          <div className="form-group">
            <span>Chọn Phương thức thanh toán:</span>
            <div className="controls">
              <span className="radio-inline">
                <input
                  type="radio"
                  name="bankCode"
                  value=""
                  checked={bankCode === ''}
                  onChange={handleBankCodeChange}
                />
                Cổng thanh toán VNPAYQR
              </span>
              {/* Các radio buttons khác */}
            </div>
          </div>

          <div className="form-group">
            <span>Ngôn ngữ</span>
            <div className="controls">
              <span className="radio-inline">
                <input
                  type="radio"
                  name="language"
                  value="vn"
                  checked={language === 'vn'}
                  onChange={handleLanguageChange}
                />
                Tiếng việt
              </span>
              <span className="radio-inline">
                <input
                  type="radio"
                  name="language"
                  value="en"
                  checked={language === 'en'}
                  onChange={handleLanguageChange}
                />
                Tiếng anh
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-default">Thanh toán</button>
        </form>
      </div>
      <p>&nbsp;</p>
    </div>
  );
};

export default Vnpay;
