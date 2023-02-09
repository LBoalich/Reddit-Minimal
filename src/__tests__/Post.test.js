/**  

import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '../utils/test-utils'
import Post from '../components/Posts/Post'

export const handlers = [
  rest.get("https://www.reddit.com/r/popular.json", async (req, res, ctx) => {
    const postResponse = await ctx.fetch(req);

    return res(
        ctx.json({
          data: {
            children: [
              {
                data: {
                  author: "Post author 1",
                  media: "https://v.redd.it/4cszdsizt6ha1/DASH_720.mp4?source=fallback",
                  numComments: "Post comNum 1",
                  score: "Post score 1",
                  selftextHtml: "Post text 1",
                  title: "Post title 1",
                  url: "https://v.redd.it/ke2leih4y6ha1",
                  id: "Post id 1",
                  subreddit: "Post subreddit 1",
                  mediaData: null,
                  preview: {"images": [{"source": {"url": "https://external-preview.redd.it/A7C1sFgi3e7J_FGNnSP8_bXobLiYuTSxsjTGVYhS47Q.png?format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=00c9d0f72374adbfc55f536dc922c228a44fa029", "width": 576, "height": 1024}, "resolutions": [{"url": "https://external-preview.redd.it/A7C1sFgi3e7J_FGNnSP8_bXobLiYuTSxsjTGVYhS47Q.png?width=108&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=90ffd62a82b676be22494194bf8d9b758653e124", "width": 108, "height": 192}, {"url": "https://external-preview.redd.it/A7C1sFgi3e7J_FGNnSP8_bXobLiYuTSxsjTGVYhS47Q.png?width=216&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=8af48068b007b779e50517f56ba7ee5cfb2fc8eb", "width": 216, "height": 384}, {"url": "https://external-preview.redd.it/A7C1sFgi3e7J_FGNnSP8_bXobLiYuTSxsjTGVYhS47Q.png?width=320&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=efd9f76ce2bafeaaa08ab2444bda44c5ee7e652e", "width": 320, "height": 568}], "variants": {}, "id": "BIRRbiLtoh-yChVpPDsopCVX8eJ4rbzG43JSd1ETCPg"}], "enabled": false},
                  hint: null,
                  gallery: null,
                }
              },
              {
                data: {
                  author: "Post author 2",
                  media: "https://v.redd.it/4cszdsizt6ha1/DASH_720.mp4?source=fallback",
                  numComments: "Post comNum 2",
                  score: "Post score 2",
                  selftextHtml: "Post text 2",
                  title: "Post title 2",
                  url: "https://v.redd.it/ke2leih4y6ha1",
                  id: "Post id 2",
                  subreddit: "Post subreddit 2",
                  mediaData: null,
                  preview: {"images": [{"source": {"url": "https://external-preview.redd.it/A7C1sFgi3e7J_FGNnSP8_bXobLiYuTSxsjTGVYhS47Q.png?format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=00c9d0f72374adbfc55f536dc922c228a44fa029", "width": 576, "height": 1024}, "resolutions": [{"url": "https://external-preview.redd.it/A7C1sFgi3e7J_FGNnSP8_bXobLiYuTSxsjTGVYhS47Q.png?width=108&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=90ffd62a82b676be22494194bf8d9b758653e124", "width": 108, "height": 192}, {"url": "https://external-preview.redd.it/A7C1sFgi3e7J_FGNnSP8_bXobLiYuTSxsjTGVYhS47Q.png?width=216&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=8af48068b007b779e50517f56ba7ee5cfb2fc8eb", "width": 216, "height": 384}, {"url": "https://external-preview.redd.it/A7C1sFgi3e7J_FGNnSP8_bXobLiYuTSxsjTGVYhS47Q.png?width=320&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=efd9f76ce2bafeaaa08ab2444bda44c5ee7e652e", "width": 320, "height": 568}], "variants": {}, "id": "BIRRbiLtoh-yChVpPDsopCVX8eJ4rbzG43JSd1ETCPg"}], "enabled": false},
                  hint: null,
                  gallery: null,
                }
              },
              {
                data: {
                  author: "Post author 3",
                  media: "https://v.redd.it/4cszdsizt6ha1/DASH_720.mp4?source=fallback",
                  numComments: "Post comNum 3",
                  score: "Post score 3",
                  selftextHtml: "Post text 3",
                  title: "Post title 3",
                  url: "https://v.redd.it/ke2leih4y6ha1",
                  id: "Post id 3",
                  subreddit: "Post subreddit 3",
                  mediaData: null,
                  preview: {"images": [{"source": {"url": "https://external-preview.redd.it/A7C1sFgi3e7J_FGNnSP8_bXobLiYuTSxsjTGVYhS47Q.png?format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=00c9d0f72374adbfc55f536dc922c228a44fa029", "width": 576, "height": 1024}, "resolutions": [{"url": "https://external-preview.redd.it/A7C1sFgi3e7J_FGNnSP8_bXobLiYuTSxsjTGVYhS47Q.png?width=108&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=90ffd62a82b676be22494194bf8d9b758653e124", "width": 108, "height": 192}, {"url": "https://external-preview.redd.it/A7C1sFgi3e7J_FGNnSP8_bXobLiYuTSxsjTGVYhS47Q.png?width=216&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=8af48068b007b779e50517f56ba7ee5cfb2fc8eb", "width": 216, "height": 384}, {"url": "https://external-preview.redd.it/A7C1sFgi3e7J_FGNnSP8_bXobLiYuTSxsjTGVYhS47Q.png?width=320&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=efd9f76ce2bafeaaa08ab2444bda44c5ee7e652e", "width": 320, "height": 568}], "variants": {}, "id": "BIRRbiLtoh-yChVpPDsopCVX8eJ4rbzG43JSd1ETCPg"}], "enabled": false},
                  hint: null,
                  gallery: null,
                }
              },
        ]}}), ctx.delay(150))
  }),

  rest.get('https://www.reddit.com/r/pcmasterrace/comments/10wujou/wheredoesmymonitorgo?/.json', async (req, res, ctx) => {
    const originalResponse = await ctx.fetch(req.url.searchParams);

    return res( 
        ctx.json([{
          data: {
            children: [
              {
                data: {
                  id: "Comment Id 1",
                  author: "Comment Author 1",
                  body: "Comment Body 1"
                }
              },
              {
                data: {
                  id: "Comment Id 2",
                  author: "Comment Author 2",
                  body: "Comment Body 2"
                }
              },
              {
                data: {
                  id: "Comment Id 3",
                  author: "Comment Author 3",
                  body: "Comment Body 3"
                }
              },
        ]}}]), ctx.delay(150))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('fetches & receives comments after clicking the fetch comments button', async () => {
  renderWithProviders(<Post />)

  // should show no comments initially, and not be fetching the comments
  expect(screen.queryByText("Loading Comments")).not.toBeInTheDocument()

  // after clicking the 'Fetch comments' button, it should now show that it is fetching the comments
  fireEvent.click(screen.queryByTestId("comment-button"))
  expect(screen.getByText("Loading Comments")).toBeInTheDocument()

  // after some time, the comments should be received
  expect(await screen.findByText("body")).toBeInTheDocument()
  expect(await screen.queryByText("Loading Comments")).not.toBeInTheDocument()
  
})

**/