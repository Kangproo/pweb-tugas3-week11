import { test, expect } from "@playwright/test"

test("menampilkan daftar produk awal serta mendukung CRUD produk", async ({
    page,
}) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto("/")
    await expect(page).toHaveURL(/\/products$/)
    await expect(page.locator("article")).toHaveCount(5)
    await expect(page.getByRole("heading", { name: "Pulpen" })).toBeVisible()

    // Tambah produk
    await page.getByRole("button", { name: "Tambah Produk" }).click()
    await page.getByLabel("Nama Produk").fill("Stabilo")
    await page.getByLabel("Harga (Rp)").fill("7000")
    await page.getByRole("button", { name: "Simpan Produk" }).click()
    await expect(page.getByRole("heading", { name: "Stabilo" })).toBeVisible()
    await expect(page.locator("article")).toHaveCount(6)
})

test("menampilkan halaman detail /products/:id sesuai ID dan link kembali", async ({
    page,
}) => {
    await page.goto("/products/2")
    await expect(
        page.getByRole("heading", { name: "Buku Tulis" }),
    ).toBeVisible()
    await expect(page.getByText("Rp12.000").first()).toBeVisible()
    await page
        .getByRole("link", { name: /Kembali ke Daftar Produk/i })
        .first()
        .click()
    await expect(page).toHaveURL(/\/products$/)
})

test("mengubah tampilan grid/list dari halaman Settings", async ({ page }) => {
    await page.goto("/settings")
    await page.getByRole("button", { name: /Tampilan List/i }).click()
    await expect(page.getByRole("status")).toContainText("List")
    await page.getByRole("link", { name: /Kembali ke Daftar Produk/i }).click()
    await expect(page.locator("[data-view-mode='list']")).toBeVisible()
})

test("menampilkan halaman 404 dengan pesan jelas dan tautan kembali", async ({
    page,
}) => {
    await page.goto("/halaman-tidak-ada")
    await expect(
        page.getByRole("heading", { name: "Halaman Tidak Ditemukan" }),
    ).toBeVisible()
    await page.getByRole("link", { name: /Kembali ke Daftar Produk/i }).click()
    await expect(page).toHaveURL(/\/products$/)
})
