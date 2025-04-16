import discord
from discord import app_commands
from discord.ext import commands

class Moderation(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    # Ban Command (slash command)
    @app_commands.command(name="ban", description="Ban a member from the server.")
    @app_commands.describe(member="The member to ban.", reason="Reason for banning.")
    async def ban(self, interaction: discord.Interaction, member: discord.Member, reason: str = "No reason provided."):
        if not interaction.user.guild_permissions.ban_members:
            await interaction.response.send_message("You don't have permission to ban members.", ephemeral=True)
            return

        if member == interaction.user:
            await interaction.response.send_message("You can't ban yourself.", ephemeral=True)
            return

        if member.top_role >= interaction.user.top_role:
            await interaction.response.send_message("You can't ban someone with an equal or higher role.", ephemeral=True)
            return

        await member.ban(reason=reason)
        await interaction.response.send_message(f"{member.mention} has been banned. Reason: {reason}")

        # Optional log to #ban-logs channel
        log_channel = discord.utils.get(interaction.guild.text_channels, name='ban-logs')
        if log_channel:
            await log_channel.send(f"{member.mention} was banned by {interaction.user.mention}. Reason: {reason}")

async def setup(bot):
    await bot.add_cog(Moderation(bot))
