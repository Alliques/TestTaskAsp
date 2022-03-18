﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace TestTaskBrio.Infrastructure.Data
{
    public class AppHub : Hub
    {
        public async Task Send(object message)
        {
            await this.Clients.All.SendAsync("Send", message);
        }
    }
}
