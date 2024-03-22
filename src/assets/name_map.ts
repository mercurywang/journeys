export const getEnName = (name: string) => {
  const countyMap: { [key: string]: string } = {
    北海道: "Hokkaido",
    青森県: "Aomori",
    岩手県: "Iwate",
    宮城県: "Miyagi",
    秋田県: "Akita",
    山形県: "Yamagata",
    福島県: "Fukushima",
    茨城県: "Ibaragi",
    栃木県: "Tochigi",
    群馬県: "Gunma",
    埼玉県: "Saitama",
    千葉県: "Chiba",
    東京都: "Tokyo",
    神奈川県: "Kanagawa",
    新潟県: "Niigata",
    富山県: "Toyama",
    石川県: "Ishikawa",
    福井県: "Fukui",
    山梨県: "Yamanashi",
    長野県: "Nagano",
    岐阜県: "Gifu",
    静岡県: "Shizuoka",
    愛知県: "Aichi",
    三重県: "Mie",
    滋賀県: "Shiga",
    京都府: "Kyoto",
    大阪府: "Osaka",
    兵庫県: "Hyogo",
    奈良県: "Nara",
    和歌山県: "Wakayama",
    鳥取県: "Tottori",
    島根県: "Shimane",
    岡山県: "Okayama",
    広島県: "Hiroshima",
    山口県: "Yamaguchi",
    徳島県: "Tokushima",
    香川県: "Kagawa",
    愛媛県: "Ehime",
    高知県: "Kochi",
    福岡県: "Fukuoka",
    佐賀県: "Saga",
    長崎県: "Nagasaki",
    熊本県: "Kumamoto",
    大分県: "Oita",
    宮崎県: "Miyazaki",
    鹿児島県: "Kagoshima",
    沖縄県: "Okinawa",
  };

  return countyMap[name] || "Not Found";
};

export const getZoom = (name: string) => {
  const zoomMap: { [key: string]: number } = {
    Hokkaido: 2,
    Aomori: 1.1,
    Iwate: 1.1,
    Miyagi: 1.1,
    Akita: 1.1,
    Yamagata: 1.1,
    Fukushima: 1.1,
    Ibaragi: 1.1,
    Tochigi: 1.1,
    Gunma: 1.1,
    Saitama: 1.1,
    Chiba: 1.3,
    Tokyo: 24,
    Kanagawa: 1.1,
    Niigata: 1.1,
    Toyama: 1.1,
    Ishikawa: 1.5,
    Fukui: 1.1,
    Yamanashi: 1.1,
    Nagano: 1.3,
    Gifu: 1.3,
    Shizuoka: 1.1,
    Aichi: 1.2,
    Mie: 1.3,
    Shiga: 1.1,
    Kyoto: 1.1,
    Osaka: 1.3,
    Hyogo: 1.1,
    Nara: 1.1,
    Wakayama: 1.1,
    Tottori: 1.1,
    Shimane: 1.5,
    Okayama: 1.1,
    Hiroshima: 1.1,
    Yamaguchi: 1.1,
    Tokushima: 1.1,
    Kagawa: 1.1,
    Ehime: 1.1,
    Kochi: 1.1,
    Fukuoka: 1.3,
    Saga: 1.1,
    Nagasaki: 1.5,
    Kumamoto: 1.1,
    Oita: 1.1,
    Miyazaki: 1.1,
    Kagoshima: 3,
    Okinawa: 5,
  };
  return zoomMap[name] || 1.8;
};
