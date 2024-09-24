import express from "express";
//import { Ad } from "./utils/types";
import { ads } from "./utils/constants";
import { AdPatchSchema, AdSchema } from "./schemas/ad.schema";
import { Ad } from "./utils/types";

const app = express();

app.use(express.json());

const port = 3000;

app.get("/ads", (_, res) => {
  try {
    return res.status(200).json({ ads });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/ads", (req, res) => {
  try {
    const result = AdSchema.safeParse(req.body);

    if (!result.success) {
      return res
        .status(400)
        .json({ error: "Invalid Ad format", details: result.error.errors });
    }

    const newAd: Ad = result.data;
    newAd.id = ads[ads.length - 1].id + 1;
    ads.push(newAd);
    return res.status(200).json({ id: newAd.id });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/ads", (req, res) => {
  try {
    const result = AdSchema.safeParse(req.body);

    if (!result.success) {
      return res
        .status(400)
        .json({ error: "Invalid Ad format", details: result.error.errors });
    }

    const updatedAd: Ad = result.data;

    let adToEdit: Ad | undefined;
    for (const ad of ads) {
      if (ad.id === updatedAd.id) {
        adToEdit = ad;
        break;
      }
    }

    if (adToEdit) {
      Object.assign(adToEdit, updatedAd);
      return res.status(200).json({ id: updatedAd.id });
    } else {
      return res.status(400).json({
        error: "Ad to update not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/ads/:id", (req, res) => {
  try {
    const result = AdPatchSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Invalid Ad format",
        details: result.error.errors,
      });
    }

    const updatedFields = result.data;
    const adId = Number(req.params.id);

    let adToEdit: Ad | undefined;
    for (const ad of ads) {
      if (ad.id === adId) {
        adToEdit = ad;
        break;
      }
    }

    if (adToEdit) {
      Object.assign(adToEdit, updatedFields);
      return res.status(200).json({ id: adToEdit.id });
    } else {
      return res.status(404).json({
        error: "Ad to update not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/ads/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    let adFound = false;

    for (let i = 0; i < ads.length; i++) {
      if (ads[i].id === id) {
        ads.splice(i, 1);
        adFound = true;
        break;
      }
    }

    if (!adFound) {
      return res.status(404).json({ error: "Ad not found" });
    }

    return res.status(200).json({ id: id });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
