<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep this explicitly section-anchored portfolio at `/`; navigation targets real section IDs because the brief requests in-page anchors and smooth scrolling.
- Keep reusable presentation and motion helpers in `src/components/portfolio` and page metadata in the index route so content remains separate from routing.
- Define visual roles in `src/styles.css` and use the shared Button variants so the portfolio remains consistently themed.
- Use supplied external profile links for contact and clearly labeled unconfirmed project slots; do not add a contact form without a working delivery service.
