import discord
from discord import app_commands
from discord.ext import commands
import datetime

class Moderation(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    # Timeout Command (slash command)
    @app_commands.command(name="timeout", description="Timeout a member in the server.")
    @app_commands.describe(member="The member to timeout.", duration="Duration of the timeout (e.g., '1m', '1h').", reason="Reason for the timeout.")
    async def timeout(self, interaction: discord.Interaction, member: discord.Member, duration: str = "10m", reason: str = "No reason provided."):
        if not interaction.user.guild_permissions.moderate_members:
            await interaction.response.send_message("You don't have permission to timeout members.", ephemeral=True)
            return

        if member == interaction.user:
            await interaction.response.send_message("You can't timeout yourself.", ephemeral=True)
            return

        if member.top_role >= interaction.user.top_role:
            await interaction.response.send_message("You can't timeout someone with an equal or higher role.", ephemeral=True)
            return

        # Convert duration to seconds
        time_mapping = {'m': 60, 'h': 3600, 'd': 86400}
        if duration[-1] in time_mapping:
            try:
                timeout_duration = int(duration[:-1]) * time_mapping[duration[-1]]
            except ValueError:
                await interaction.response.send_message("Invalid duration format. Please use something like '1m' or '1h'.", ephemeral=True)
                return
        else:
            await interaction.response.send_message("Invalid duration format. Please use something like '1m' or '1h'.", ephemeral=True)
            return

        # Apply timeout
        await member.timeout_for(datetime.timedelta(seconds=timeout_duration), reason=reason)
        await interaction.response.send_message(f"{member.mention} has been timed out for {duration}. Reason: {reason}")

        # Optional log to #timeout-logs channel
        log_channel = discord.utils.get(interaction.guild.text_channels, name='timeout-logs')
        if log_channel:
            await log_channel.send(f"{member.mention} was timed out by {interaction.user.mention}. Duration: {duration}, Reason: {reason}")

    # Kick Command (slash command)
    @app_commands.command(name="kick", description="Kick a member from the server.")
    @app_commands.describe(member="The member to kick.", reason="Reason for kicking.")
    async def kick(self, interaction: discord.Interaction, member: discord.Member, reason: str = "No reason provided."):
        if not interaction.user.guild_permissions.kick_members:
            await interaction.response.send_message("You don't have permission to kick members.", ephemeral=True)
            return

        if member == interaction.user:
            await interaction.response.send_message("You can't kick yourself.", ephemeral=True)
            return

        if member.top_role >= interaction.user.top_role:
            await interaction.response.send_message("You can't kick someone with an equal or higher role.", ephemeral=True)
            return

        await member.kick(reason=reason)
        await interaction.response.send_message(f"{member.mention} has been kicked. Reason: {reason}")

        # Optional log to #kick-logs channel
        log_channel = discord.utils.get(interaction.guild.text_channels, name='kick-logs')
        if log_channel:
            await log_channel.send(f"{member.mention} was kicked by {interaction.user.mention}. Reason: {reason}")

    # Mute Command (slash command)
    @app_commands.command(name="mute", description="Mute a member in the server.")
    @app_commands.describe(member="The member to mute.", reason="Reason for muting.")
    async def mute(self, interaction: discord.Interaction, member: discord.Member, reason: str = "No reason provided."):
        if not interaction.user.guild_permissions.mute_members:
            await interaction.response.send_message("You don't have permission to mute members.", ephemeral=True)
            return

        if member == interaction.user:
            await interaction.response.send_message("You can't mute yourself.", ephemeral=True)
            return

        if member.top_role >= interaction.user.top_role:
            await interaction.response.send_message("You can't mute someone with an equal or higher role.", ephemeral=True)
            return

        # Create a mute role if not already present
        mute_role = discord.utils.get(interaction.guild.roles, name="Muted")
        if not mute_role:
            mute_role = await interaction.guild.create_role(name="Muted", permissions=discord.Permissions(send_messages=False))

        await member.add_roles(mute_role, reason=reason)
        await interaction.response.send_message(f"{member.mention} has been muted. Reason: {reason}")

        # Optional log to #mute-logs channel
        log_channel = discord.utils.get(interaction.guild.text_channels, name='mute-logs')
        if log_channel:
            await log_channel.send(f"{member.mention} was muted by {interaction.user.mention}. Reason: {reason}")

    # Unmute Command (slash command)
    @app_commands.command(name="unmute", description="Unmute a member in the server.")
    @app_commands.describe(member="The member to unmute.")
    async def unmute(self, interaction: discord.Interaction, member: discord.Member):
        if not interaction.user.guild_permissions.mute_members:
            await interaction.response.send_message("You don't have permission to unmute members.", ephemeral=True)
            return

        mute_role = discord.utils.get(interaction.guild.roles, name="Muted")
        if mute_role not in member.roles:
            await interaction.response.send_message(f"{member.mention} is not muted.", ephemeral=True)
            return

        await member.remove_roles(mute_role)
        await interaction.response.send_message(f"{member.mention} has been unmuted.")

        # Optional log to #unmute-logs channel
        log_channel = discord.utils.get(interaction.guild.text_channels, name='unmute-logs')
        if log_channel:
            await log_channel.send(f"{member.mention} was unmuted by {interaction.user.mention}.")

async def setup(bot):
    await bot.add_cog(Moderation(bot))
