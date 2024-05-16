const spaceId = "zal03fv4ef2b";
const environmentId = "master";
const accessToken = "X3ASKCNciTggeYdGlrAWZ9i1T_UKYbgngSiZ9WKLywA";

const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}`;

const sectionTag = document.querySelector("section.grid");

const grabData = () => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const assets = data.includes.Asset;

      return data.items.map((item) => {
        let imageUrl = "./Assets/image1.jpg";

        const imageId = item.fields.image.sys.id;

        const imageData = assets.find((asset) => {
          return asset.sys.id === imageId;
        });

        if (imageData) {
          imageUrl = imageData.fields.file.url;
        }

        item.fields.image = `http://${imageUrl}`;
        return item.fields;
      });
    });
};

grabData().then((data) => {
  //   console.log(data);

  sectionTag.innerHTML = "";

  data.forEach((item) => {
    sectionTag.innerHTML =
      sectionTag.innerHTML +
      `
    <div class="item">
          <img src="${item.image}" alt="" />
          <div class="title">
            <h2>${item.title}</h2>
            <p>${item.price}</p>
          </div>
          <p>
           ${item.Description}
          </p>
        </div>
    `;
  });
});
