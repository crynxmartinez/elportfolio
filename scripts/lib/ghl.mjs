// Shared GHL Social Planner helper: confirming a just-published post's id
// and preview link. The create response's shape for a published post
// doesn't reliably expose _id/previewLink (draft responses do). The list
// endpoint exposes both reliably by matching on summary text, but
// previewLink is sometimes still empty for a few seconds after publish
// while GHL finishes posting through to the platform - so once an id is
// found, retry a direct GET on it a few times before giving up on the link.

const GHL_BASE = "https://services.leadconnectorhq.com";

export async function confirmPost(summary, postResult, { token, locationId }) {
  let ghlPostId = null;
  let previewLink = null;

  try {
    const listRes = await fetch(`${GHL_BASE}/social-media-posting/${locationId}/posts/list`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, Version: "v3", "Content-Type": "application/json" },
      body: JSON.stringify({ limit: "10", skip: "0" }),
    });
    const listData = await listRes.json();
    const match = (listData.results?.posts || []).find((p) => p.summary === summary);
    if (match) {
      ghlPostId = match._id ?? null;
      previewLink = match.previewLink ?? null;
    }
  } catch (e) {
    console.log("Could not confirm post id via list lookup:", e.message);
  }

  if (ghlPostId && !previewLink) {
    for (let attempt = 0; attempt < 4 && !previewLink; attempt++) {
      await new Promise((r) => setTimeout(r, 4000));
      try {
        const getRes = await fetch(`${GHL_BASE}/social-media-posting/${locationId}/posts/${ghlPostId}`, {
          headers: { Authorization: `Bearer ${token}`, Version: "v3", Accept: "application/json" },
        });
        const getData = await getRes.json();
        previewLink = getData.results?.post?.previewLink ?? null;
      } catch (e) {
        console.log(`Retry ${attempt + 1}: could not fetch post by id:`, e.message);
      }
    }
  }

  if (!ghlPostId) {
    console.log("Raw create response (for debugging):", JSON.stringify(postResult));
  }
  return { ghlPostId, previewLink };
}
