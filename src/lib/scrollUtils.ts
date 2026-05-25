/** Altura aproximada del navbar sticky para compensar scroll a secciones */
export const NAVBAR_SCROLL_OFFSET = 88;

export function scrollToPageSection(selector: string, behavior: ScrollBehavior = "smooth"): boolean {
    const el = document.querySelector(selector);
    if (!el) return false;

    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_SCROLL_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior });
    return true;
}

/** Desplaza solo el contenedor horizontal; no mueve el scroll de la página */
export function scrollChildIntoHorizontalContainer(
    container: HTMLElement | null | undefined,
    child: HTMLElement | null | undefined,
    behavior: ScrollBehavior = "smooth"
) {
    if (!container || !child) return;

    const left =
        child.offsetLeft - (container.clientWidth - child.clientWidth) / 2;
    container.scrollTo({ left: Math.max(0, left), behavior });
}
