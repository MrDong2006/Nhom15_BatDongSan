using Nhom15_BatDongSan.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<DataService>();

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(cfg => {
    cfg.Cookie.Name = "nhom15_bds_session";
    cfg.IdleTimeout = new TimeSpan(1, 0, 0); // 1 hour
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseSession();

app.UseAuthorization();

// Route cho Area Admin (Bài thực hành của Thầy)
app.MapControllerRoute(
    name: "areas",
    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
